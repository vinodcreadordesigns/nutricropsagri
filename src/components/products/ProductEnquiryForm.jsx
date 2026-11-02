import DynamicForm from "../common/DynamicForm";
import { products } from "../../data/products";

export default function ProductEnquiryForm({ productName }) {
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "company", label: "Company" },
    { name: "product", label: "Product", type: "select", full: true, options: products.map((p) => ({ value: p.name, label: p.name })) },
    { name: "message", label: "Message", type: "textarea", required: true },
  ];
  return <DynamicForm key={productName} formName="product-enquiry" fields={fields} initial={{ product: productName }} submitLabel="Send Enquiry" />;
}
