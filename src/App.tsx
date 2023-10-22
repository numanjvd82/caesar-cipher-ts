import {
  App as AntDApp,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import Header from "./Header";
import { decodeUsingCaesarCipher, encodeUsingCaesarCipher } from "./utils";

const { TextArea } = Input;

export type Settings = {
  shift: number;
  includeSymbols: boolean;
  includeNumbers: boolean;
  includeUppercase: boolean;
};

type FormValues = {
  plainText: string;
  cipherText: string;
  encodeOrDecode: "encode" | "decode";
  settings: Settings;
};

const textareaStyle: React.CSSProperties = {
  fontSize: "1.1rem",
};

function App() {
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
      const result = encodeUsingCaesarCipher(plainText, settings);
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
      const result = decodeUsingCaesarCipher(cipherText, settings);
      // Simulate loading
      setTimeout(() => {
        setResultText(result);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <Row
        style={{
          marginTop: "1rem",
        }}
        justify="center"
      >
        <Col xs={24} sm={18} md={12}>
          <Form
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
            initialValues={{
              plainText: "",
              cipherText: "",
              encodeOrDecode: "encode",
              settings: {
                shift: 3,
                includeSymbols: false,
                includeNumbers: false,
                includeUppercase: false,
                includeLowercase: true,
              },
            }}
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
                <TextArea style={textareaStyle} rows={4} />
              </Form.Item>

              <Typography.Title level={5}>Settings</Typography.Title>
              <Card size="small">
                <Form.Item label="Shift" name={["settings", "shift"]}>
                  <InputNumber min={1} type="number" />
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
                  <Col xs={24} sm={18} md={8}>
                    <Form.Item
                      name={["settings", "includeUppercase"]}
                      valuePropName="checked"
                    >
                      <Checkbox>Include Uppercase</Checkbox>
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

export default App;
