import { Alert, Container } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useStores } from "~/stores/useStores";
import "@mantine/dropzone/styles.css";

const BasicLayout = observer(() => {
  const {
    alertStore,
    alertStore: { alertMessage },
  } = useStores();

  return (
    <div className="flex flex-col w-full min-h-screen">
      {alertMessage.message && (
        <Alert
          className="whitespace-pre-line"
          color={alertMessage.status}
          icon={<IconInfoCircle />}
          onClose={() => alertStore.reset()}
          title={alertMessage.title}
          variant="light"
          withCloseButton={true}
        >
          {alertMessage.message}
        </Alert>
      )}

      <Container size={"xl"} className="flex flex-col flex-grow w-full p-6">
        <Outlet />
      </Container>
    </div>
  );
});

export default BasicLayout;
