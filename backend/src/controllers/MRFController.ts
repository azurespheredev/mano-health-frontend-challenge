import { promises as fs } from "fs";
import type { Context } from "hono";
import path from "path";
import { fileURLToPath } from "url";
import { convertClaimsToMRF } from "~/services/mrfService";
import type { MRFResponse } from "~/types/apiTypes";
import type { MRFRow } from "~/types/mrfTypes";
import { ENTITY_NAME, MESSAGES } from "~/utils/constants";
import { MRFReportStatus } from "~/utils/enums";
import { getCurrentTimestamp, parseTimestampString } from "~/utils/helpers";
import { claimsArrayValidationSchema } from "~/utils/validations";

// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilesDir = path.join(__dirname, "..", "..", "..", "data", "files");

export default class MRFController {
  static async generateMRF(context: Context) {
    try {
      const { claims } = await context.req.json();

      try {
        claimsArrayValidationSchema.parse(claims);
      } catch (error) {
        console.log(error);
        return context.json<MRFResponse>({
          success: false,
          message: MESSAGES.VALIDATION_ERROR,
          error: JSON.stringify(error),
        }, 400);
      }

      const convertedMRF = convertClaimsToMRF(claims);
      const mrfJSON = JSON.stringify(convertedMRF, null, 2);
      const filePath = path.join(jsonFilesDir, `${ENTITY_NAME}_${getCurrentTimestamp()}.json`);

      // Save as a new JSON file
      await fs.writeFile(filePath, mrfJSON, "utf8");

      return context.json<MRFResponse>({
        success: true,
        data: convertedMRF,
      }, 200);
    } catch (error) {
      return context.json<MRFResponse>({
        success: false,
        message: MESSAGES.GENERATE_MRF_ERROR,
        error: JSON.stringify(error),
      }, 500);
    }
  }

  static async getList(context: Context) {
    try {
      // Retrieve file names from the directory
      const files: string[] = await fs.readdir(jsonFilesDir);

      const fileList: MRFRow[] = files
        .filter((file: string) => file.endsWith(".json"))
        .map((file: string) => {
          const [entity, dateStr] = file.replace(".json", "").split("_");
          const createdAt: Date = parseTimestampString(dateStr);

          return {
            entity: entity,
            status: MRFReportStatus.OUT_NETWORK,
            createdAt,
            filename: file
          };
        });

      return context.json<MRFResponse>({
        success: true,
        data: fileList
      }, 200);
    } catch (error) {
      return context.json<MRFResponse>({
        success: false,
        message: MESSAGES.GET_MRF_LIST_ERROR,
        error: JSON.stringify(error),
      }, 500);
    }
  }

  static async downloadJSON(context: Context) {
    try {
      const filename = context.req.param("filename");
      const filePath = path.join(jsonFilesDir, filename);

      await fs.access(filePath); // Check if the file exists
      const fileData = await fs.readFile(filePath); // Read the file contents

      // Set headers to prompt download
      return context.body(fileData, 200, {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      });
    } catch (error) {
      return context.json<MRFResponse>({
        success: false,
        message: MESSAGES.FILE_NOT_FOUND,
        error: JSON.stringify(error),
      }, 404);
    }
  }
}
