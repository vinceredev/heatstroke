import { Button, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { __ } from "@/Libs/i18n";
import { getBase64 } from "@/Libs/image";

export default function UploadAvatar({ data, setData }) {
    const beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 <= 2;
        if (!isLt2M) {
            return notification.error("image must be smaller than 2MB!");
        }
    };

    const handleChange = async (info) => {
        if (info.file.status === "uploading") {
            const url = await getBase64(info.file.originFileObj);
            setData("avatar", url);
        }
    };

    const onRemove = () => {
        setData("avatar", null);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{__("Upload")}</div>
        </div>
    );

    return (
        <div className="pt-[33px] pb-4">
            <div className="text-sm">{__("Avatar")}</div>
            <div className="mt-2 flex items-center">
                <div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChange}
                        accept="image/jpeg, image/png, image/jpg"
                        beforeUpload={beforeUpload}
                    >
                        {data.avatar ? (
                            <img
                                src={`${data.avatar}`}
                                alt="avatar"
                                style={{ width: "100%" }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </div>
                <div>
                    {data.avatar ? (
                        <div className="max-w-[126px] text-sm text-[#818181] mb-3 ml-3">
                            <Upload
                                onChange={handleChange}
                                showUploadList={false}
                                accept="image/jpeg, image/png, image/jpg"
                                beforeUpload={beforeUpload}
                            >
                                <Button type="primary" size="large">
                                    {__("Update Picture")}
                                </Button>
                            </Upload>
                            <Button
                                size="large"
                                onClick={() => onRemove()}
                                className="w-full mt-[10px]"
                            >
                                {__("Remove")}
                            </Button>
                        </div>
                    ) : (
                        <div className="max-w-[166px] text-sm text-[#818181] mb-3 ml-3">
                            {__(
                                "Recommended resolution is :size with file size less than 2MB, keep visual elements centered",
                                { size: "640x640" }
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
