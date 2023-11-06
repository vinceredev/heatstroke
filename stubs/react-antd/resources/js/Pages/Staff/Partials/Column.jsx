import { Collapse, Tag, Avatar, Button, Modal, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDistance } from "date-fns";
import { Link, usePage } from "@inertiajs/react";

const userStatusColorMapper = {
    inactive: "error",
    active: "success",
    pending: "default",
};

const { Panel } = Collapse;

const CreateColumn = () => {
    const { permissions } = usePage().props.auth;

    const columns = [
        {
            title: "Role Name",
            key: "responsive_name",
            responsive: ["xs"],
            render: (_, row) => (
                <div className="responsive-table">
                    <span className="text-sm capitalize text-black/80">
                        {row?.name}
                    </span>
                    <Collapse ghost>
                        <Panel header="Expand Data" key="1">
                            <div className="responsive-table__list">
                                <div className="responsive-table__list__column">
                                    Email
                                </div>
                                <div className="responsive-table__list__value">
                                    {row?.email}
                                </div>
                            </div>
                            <div className="responsive-table__list">
                                <div className="responsive-table__list__column">
                                    Role
                                </div>
                                <div className="responsive-table__list__value">
                                    {row?.roles?.map((item) => (
                                        <span
                                            key={item.id}
                                            className="text-sm  capitalize text-black/80"
                                        >
                                            <Link
                                                href={route("role.edit", {
                                                    id: item.id,
                                                })}
                                            >
                                                {item?.name}
                                            </Link>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="responsive-table__list">
                                <div className="responsive-table__list__column">
                                    <span className="capitalize">
                                        <Tag
                                            color={
                                                userStatusColorMapper[
                                                    row.status
                                                ]
                                            }
                                        >
                                            {row?.status}
                                        </Tag>
                                    </span>
                                </div>
                                <div className="responsive-table__list__value">
                                    {row?.status}
                                </div>
                            </div>
                            <div className="responsive-table__list">
                                <div className="responsive-table__list__column">
                                    Join Date
                                </div>
                                <div className="responsive-table__list__value">
                                    {formatDistance(
                                        new Date(row?.created_at),
                                        new Date(),
                                        { addSuffix: true }
                                    )}
                                </div>
                            </div>
                            {permissions.edit_staff ||
                                (permissions.delete_staff && (
                                    <div className="responsive-table__list">
                                        <div className="responsive-table__list__column">
                                            Action
                                        </div>
                                        <div className="responsive-table__list__value">
                                            <>
                                                <div className="flex items-center gap-4">
                                                    {permissions.edit_staff && (
                                                        <Button
                                                            type="link"
                                                            href={route(
                                                                "staff.edit",
                                                                { id: row?.id }
                                                            )}
                                                        >
                                                            <EditOutlined
                                                                size={20}
                                                            />
                                                        </Button>
                                                    )}
                                                    {permissions.delete_staff && (
                                                        <Tooltip
                                                            title={
                                                                row?.email ===
                                                                "root@vinceredigital.com"
                                                                    ? "Can not delete root user."
                                                                    : ""
                                                            }
                                                        >
                                                            <Button
                                                                type="link"
                                                                disabled={
                                                                    row?.email ===
                                                                    "root@vinceredigital.com"
                                                                }
                                                                onClick={() => {
                                                                    Modal.confirm(
                                                                        {
                                                                            title: "Delete staff",
                                                                            content: `Are you sure want to remove ${row?.name}?`,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <DeleteOutlined
                                                                    size={20}
                                                                />
                                                            </Button>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                ))}
                        </Panel>
                    </Collapse>
                </div>
            ),
        },
        {
            title: `Name`,
            key: "name",
            responsive: ["sm"],
            render: (_, row) => (
                <span className="capitalize">
                    <Avatar
                        className="h-[30px] w-[30px]"
                        src={
                            row?.avatar
                                ? `${row?.avatar}`
                                : `https://ui-avatars.com/api/?name=${row?.name}`
                        }
                    />
                    <span className="ml-[10px]">{row?.name}</span>
                </span>
            ),
        },
        {
            title: `Email`,
            key: "email",
            responsive: ["sm"],
            render: (_, row) => <span>{row?.email}</span>,
        },
        {
            title: `Role`,
            key: "role",
            responsive: ["xl"],
            render: (_, row) => (
                <span>
                    {row?.roles?.map((item) => (
                        <span
                            key={item.id}
                            className="text-sm  capitalize text-black/80"
                        >
                            <Link
                                href={route("role.edit", {
                                    id: item.id,
                                })}
                            >
                                {item?.name}
                            </Link>
                        </span>
                    ))}
                </span>
            ),
        },
        {
            title: `Status`,
            key: "status",
            responsive: ["lg"],
            render: (_, row) => (
                <span className="capitalize">
                    <Tag color={userStatusColorMapper[row.status]}>
                        {row?.status}
                    </Tag>
                </span>
            ),
        },
        {
            title: `Join Date`,
            key: "join date",
            responsive: ["lg"],
            render: (_, row) => (
                <span>
                    {formatDistance(new Date(row?.created_at), new Date(), {
                        addSuffix: true,
                    })}
                </span>
            ),
        },
        {
            title: `Action`,
            key: "action",
            responsive: ["sm"],
            hidden: !(permissions.edit_staff || permissions.delete_staff),
            render: (_, row) => (
                <>
                    <div className="flex items-center">
                        {permissions.edit_staff && (
                            <Button
                                type="link"
                                href={route("staff.edit", { id: row?.id })}
                            >
                                <EditOutlined size={20} />
                            </Button>
                        )}
                        {permissions.delete_staff && (
                            <Tooltip
                                title={
                                    row?.email === "root@vinceredigital.com"
                                        ? "Can not delete root user."
                                        : ""
                                }
                            >
                                <Button
                                    type="link"
                                    disabled={
                                        row?.email === "root@vinceredigital.com"
                                    }
                                    onClick={() => {
                                        Modal.confirm({
                                            title: "Delete staff",
                                            content: `Are you sure want to remove ${row?.name}?`,
                                        });
                                    }}
                                >
                                    <DeleteOutlined size={20} />
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </>
            ),
        },
    ].filter((item) => !item.hidden);

    return columns;
};

export default CreateColumn;
