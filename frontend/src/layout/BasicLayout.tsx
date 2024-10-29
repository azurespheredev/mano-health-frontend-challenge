import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";
import "@mantine/dropzone/styles.css";

const BasicLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Container size={"xl"} className="flex flex-col flex-grow w-full p-6">
        <Outlet />
      </Container>
    </div>
  );
};

export default BasicLayout;