import { useParams } from "react-router";

export default function Job() {
  const params = useParams();

  console.log('params',params.id);
  return (<>Job</>);
}