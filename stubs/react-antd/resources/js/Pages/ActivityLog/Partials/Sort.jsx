import { useState } from 'react';
import { Dropdown, Space } from 'antd';
import { __ } from '@/Libs/i18n';
import { DownOutlined } from '@ant-design/icons';

export default function Sort({ params, setParams }) {
    const [SortLabel, setShortLabel] = useState('Newest');

    const items = [
        {
            label: __('Newest'),
            key: 'desc',
        },
        {
            label: __('Oldest'),
            key: 'asc',
        },
    ];

    const onClick = ({ key }) => {
        setParams({ ...params, page: 1, field: 'created_at', direction: key });
        setShortLabel(items.find((x) => x.key === key).label);
    };

    return (
        <div className='inline-flex items-center justify-start gap-x-2'>
            <div className='text-black/50'>{__('Sort by')}</div>
            <Dropdown menu={{ items, onClick }} className='hover:text-coldwell-primary'>
                <a onClick={(e) => e.preventDefault()} className='text-black/80'>
                    <Space>
                        {__(SortLabel)}
                        <DownOutlined className='text-[10px] text-black/50' />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
}
