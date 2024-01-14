import {
  App as AntDApp,
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { vigenereDecrypt, vigenereEncrypt } from "../utils";
import { titleStyle } from "./CaesarCipher";

const { TextArea } = Input;

export const textareaStyle: React.CSSProperties = {
  fontSize: "1.1rem",
};

export type VignereSettings = {
  key: string;
  includeSymbols: boolean;
  includeNumbers: boolean;
};

type FormValues = {
  plainText: string;
  cipherText: string;
  encodeOrDecode: "encode" | "decode";
  settings: VignereSettings;
};

function VignereCipher() {
  const [resultText, setResultText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<FormValues>();

  const { message } = AntDApp.useApp();

  const encodeOrDecode = Form.useWatch("encodeOrDecode", form);

  const handleValuesChange = (changedValues: FormValues) => {
    if (changedValues.encodeOrDecode !== undefined) {
      form.resetFields(["plainText", "cipherText"]);
      setResultText("");
    }
  };

  const handleSubmit = (values: FormValues) => {
    const { plainText, cipherText, settings } = values;
    if (encodeOrDecode === "encode") {
      if (plainText.length === 0) {
        message.error("Please enter text");
        return;
      }
      setLoading(true);
      const result = vigenereEncrypt(plainText, settings.key, settings);
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
      const result = vigenereDecrypt(cipherText, settings.key, settings);
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
          Vignere Cipher
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
              settings: {
                key: "",
                includeSymbols: false,
                includeNumbers: false,
              },
            }}
            form={form}
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
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
                <Form.Item label="Key" name={["settings", "key"]}>
                  <Input placeholder="Enter key" required />
                </Form.Item>
                <Row>
                  <Col xs={24} sm={18} md={8}>
                    <Form.Item
                      name={["settings", "includeSymbols"]}
                      valuePropName="checked"
                    >
                      <Checkbox>Include Symbols</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={18} md={8}>
                    <Form.Item
                      name={["settings", "includeNumbers"]}
                      valuePropName="checked"
                    >
                      <Checkbox>Include Numbers</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
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

export default VignereCipher;
