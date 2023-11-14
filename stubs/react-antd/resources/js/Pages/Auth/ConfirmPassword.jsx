import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { __ } from "@/Libs/i18n";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                {__(
                    "This is a secure area of the application. Please confirm your password before continuing."
                )}
            </div>

            <Form onFinish={submit}>
                <Form.Item
                    name="password"
                    label={__("Password")}
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password}
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: __("Please input your password"),
                        },
                    ]}
                >
                    <Input
                        id="password"
                        size="large"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={onChange}
                        placeholder={__("Enter your password")}
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        loading={processing}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                        className="h-auto font-semibold text-base bg-primary hover:bg-primary"
                    >
                        {__("Confirm")}
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
