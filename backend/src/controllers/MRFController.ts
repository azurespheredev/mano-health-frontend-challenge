import type { Context } from "hono";

export default class MRFController {
  static async generateMRF(context: Context) {
    return context.json({
      success: true,
      message: "MRF generated successfully!"
    });
  }

  static async getList(context: Context) {
    return context.json({
      success: true,
      message: "List retrieved successfully!"
    });
  }

  static async downloadJSON(context: Context) {
    return context.json({
      success: true,
      message: "JSON downloaded successfully!"
    });
  }
}