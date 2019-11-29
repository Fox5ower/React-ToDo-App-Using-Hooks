import React from "react";
import { Form } from "../components/Form";
import { Notes } from "../components/Notes";
const Fragment = React.Fragment;

export const Home = () => {
  const notes = new Array(3)
    .fill("")
    .map((_, i) => ({ id: i, title: `Note ${i + 1}` }));
  return (
    <Fragment>
      <Form></Form>

      <hr></hr>

      <Notes notes={notes}></Notes>
    </Fragment>
  );
};
