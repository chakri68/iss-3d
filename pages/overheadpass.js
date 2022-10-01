import { Form, Checkbox, Button, Card } from "semantic-ui-react";

export default function OverHeadPass() {
  return (
    <div style={{ width: "400px", margin: "auto", marginTop: "2em" }}>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
