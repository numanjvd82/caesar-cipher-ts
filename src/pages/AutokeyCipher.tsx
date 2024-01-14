import {
  App as AntDApp,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { autokeyDecrypt, autokeyEncrypt } from "../utils";
import { titleStyle } from "./CaesarCipher";
import { textareaStyle } from "./VignereCipher";

type FormValues = {
  plainText: string;
  cipherText: string;
  encodeOrDecode: "encode" | "decode";
  key: string;
};

function AutokeyCipher() {
  const [resultText, setResultText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<FormValues>();

  const { message } = AntDApp.useApp();

  const { TextArea } = Input;

  const encodeOrDecode = Form.useWatch("encodeOrDecode", form);

  const handleValuesChange = (changedValues: FormValues) => {
    if (changedValues.encodeOrDecode !== undefined) {
      form.resetFields(["plainText", "cipherText"]);
      setResultText("");
    }
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    const { plainText, cipherText, key } = values;
    if (encodeOrDecode === "encode") {
      if (plainText.length === 0) {
        message.error("Please enter text");
        return;
      }
      setLoading(true);
      const result = autokeyEncrypt(plainText, key);
      // Simulate loading
      setTimeout(() => {
        setResultText(result);
        setLoading(false);
      }, 2000);
    } else {
      if (cipherText.length === 0) {
        message.error("Please enter text");
        return;
      }
      setLoading(true);
      const result = autokeyDecrypt(cipherText, key);
      // Simulate loading
      setTimeout(() => {
        setResultText(result);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <Flex justify="center">
        <Typography.Title style={titleStyle} level={2}>
          Autokey Cipher
        </Typography.Title>
      </Flex>
      <Row
        style={{
          marginTop: "1rem",
        }}
        justify="center"
      >
        <Col xs={24} sm={18} md={12}>
          <Form
            initialValues={{
              plainText: "",
              cipherText: "",
              encodeOrDecode: "encode",
              key: "",
            }}
            onValuesChange={handleValuesChange}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
          >
            <Card>
              <Form.Item name="encodeOrDecode">
                <Radio.Group
                  options={[
                    { label: "Encode", value: "encode" },
                    { label: "Decode", value: "decode" },
                  ]}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
              <Form.Item
                label={
                  encodeOrDecode === "encode" ? "Plain Text" : "Cipher Text"
                }
                name={encodeOrDecode === "encode" ? "plainText" : "cipherText"}
              >
                <TextArea style={textareaStyle} rows={4} required />
              </Form.Item>

              <Typography.Title level={5}>Settings</Typography.Title>
              <Card size="small">
                <Form.Item label="Key" name="key">
                  <Input placeholder="Enter key" required />
                </Form.Item>
              </Card>

              <Form.Item
                label={
                  encodeOrDecode === "encode" ? "Cipher Text" : "Plain Text"
                }
                style={{
                  marginTop: "1rem",
                }}
              >
                <TextArea
                  style={textareaStyle}
                  value={resultText}
                  readOnly
                  rows={4}
                />
              </Form.Item>

              <Button loading={loading} type="primary" htmlType="submit">
                Start {encodeOrDecode === "encode" ? "Encode" : "Decode"}
              </Button>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AutokeyCipher;
