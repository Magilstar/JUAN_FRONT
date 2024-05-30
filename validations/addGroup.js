import * as yup from "yup";

const addGroupSchema = yup.object().shape({
  groupName: yup.string().required("Group Name is required"),
  contacts: yup
    .array()
    .of(yup.string().required("Contact is required"))
});

export default addGroupSchema;