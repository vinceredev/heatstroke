import { __ } from "@/Libs/i18n";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button, Form, Input } from "antd";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = () => {
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {__("Profile Information")}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {__(
                        "Update your account's profile information and email address."
                    )}
                </p>
            </header>

            <Form
                onFinish={submit}
                layout="vertical"
                className="mt-6 space-y-6"
                initialValues={{
                    name: data.name,
                    email: data.email,
                }}
            >
                <Form.Item
                    name="name"
                    label={__("Name")}
                    labelCol={{ span: 24 }}
                    validateStatus={errors.name ? "error" : ""}
                    help={errors.name}
                    rules={[
                        {
                            required: true,
                            message: __("Please input your name"),
                        },
                    ]}
                >
                    <Input
                        size="large"
                        onChange={(e) => setData("name", e.target.value)}
                        value={data.name}
                        autoFocus
                        type="name"
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label={__("Email")}
                    labelCol={{ span: 24 }}
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email}
                    rules={[
                        {
                            required: true,
                            message: __("Please input your email address"),
                        },
                    ]}
                >
                    <Input
                        size="large"
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        type="email"
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            {__("Your email address is unverified.")}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {__(
                                    "Click here to re-send the verification email."
                                )}
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                {__(
                                    "A new verification link has been sent to your email address."
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button
                        loading={processing}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="h-auto text-base bg-primary hover:bg-primary"
                    >
                        {__("Save")}
                    </Button>
                </div>
            </Form>
        </section>
    );
}
