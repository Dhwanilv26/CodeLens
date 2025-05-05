import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  const { data: projects } = api.project.getProjects.useQuery();

  //   const [projectId, setProjectId] = React.useState(); // but this is not consistent as it gets changed and is not stored to refetch the saved data

  // useLocalStorage is a custom hook that allows you to use local storage in a React component. It provides a way to store and retrieve data from local storage, and it automatically updates the state when the data changes.

  const [projectId, setProjectId] = useLocalStorage("codelens-project-id", "");

  const project = projects?.find((project) => project.id === projectId);
  return {
    projects,
    project,
    projectId,
    setProjectId,
  };
};

export default useProject;
