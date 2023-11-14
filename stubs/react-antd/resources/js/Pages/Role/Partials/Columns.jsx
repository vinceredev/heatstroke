import { Collapse, Button, Modal, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDistance } from "date-fns";
import { usePage } from "@inertiajs/react";

const { Panel } = Collapse;

const CreateColumn = () => {
    const { permissions } = usePage().props.auth;

    const columns = [
        {
            title: "Role Name",
            key: "responsive_name",
            responsive: ["xs"],
            render: (_, row) => {
                const canDelete = row?.id !== 1 && row?.users_count === 0;
                return (
                    <div className="responsive-table">
                        <span className="text-sm capitalize text-black/80">
                            {row?.name}
                        </span>
                        <Collapse ghost>
                            <Panel header="Expand Data" key="1">
                                <div className="responsive-table__list">
                                    <div className="responsive-table__list__column">
                                        Total User
                                    </div>
                                    <div className="responsive-table__list__value">
                                        {row?.users_count} users
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
                                {permissions.edit_role ||
                                    (permissions.delete_role && (
                                        <div className="responsive-table__list">
                                            <div className="responsive-table__list__column">
                                                Action
                                            </div>
                                            <div className="responsive-table__list__value">
                                                <>
                                                    <div className="flex items-center gap-4">
                                                        {permissions.edit_role && (
                                                            <Button
                                                                type="link"
                                                                href={route(
                                                                    "role.edit",
                                                                    {
                                                                        id: row?.id,
                                                                    }
                                                                )}
                                                            >
                                                                <EditOutlined
                                                                    size={20}
                                                                />
                                                            </Button>
                                                        )}
                                                        {permissions.delete_role && (
                                                            <Tooltip
                                                                title={
                                                                    canDelete
                                                                        ? null
                                                                        : "Can not delete role if there is a member or the role is Super Admin"
                                                                }
                                                            >
                                                                <Button
                                                                    type="link"
                                                                    disabled={
                                                                        !canDelete
                                                                    }
                                                                    onClick={() => {
                                                                        Modal.confirm(
                                                                            {
                                                                                title: "Delete role",
                                                                                content: `Are you sure want to remove ${row?.name}?`,
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    <DeleteOutlined
                                                                        size={
                                                                            20
                                                                        }
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
                );
            },
        },
        {
            title: "Name",
            key: "name",
            responsive: ["sm"],
            render: (_, row) => <span className="capitalize">{row?.name}</span>,
        },
        {
            title: "Total User",
            key: "users_count",
            responsive: ["sm"],
            render: (_, row) => <span>{row?.users_count} users</span>,
        },
        {
            title: "Created",
            key: "created_at",
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
            title: "Action",
            key: "action",
            responsive: ["sm"],
            hidden: !(permissions.edit_role || permissions.delete_role),
            render: (_, row) => {
                const canDelete = row?.id !== 1 && row?.users_count === 0;
                return (
                    <>
                        <div className="flex items-center">
                            {permissions.edit_role && (
                                <Button
                                    type="link"
                                    href={route("role.edit", { id: row?.id })}
                                >
                                    <EditOutlined size={20} />
                                </Button>
                            )}
                            {permissions.delete_role && (
                                <Tooltip
                                    title={
                                        canDelete
                                            ? null
                                            : "Can not delete role if there is a member or the role is Super Admin"
                                    }
                                >
                                    <Button
                                        type="link"
                                        disabled={!canDelete}
                                        onClick={() => {
                                            Modal.confirm({
                                                title: "Delete role",
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
                );
            },
        },
    ].filter((item) => !item.hidden);

    return columns;
};

export default CreateColumn;
