import { debounce, pickBy } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Table, Pagination, Input } from 'antd';
import { router } from '@inertiajs/react';
import { __ } from '@/Libs/i18n';
import Sorter from './Partials/Sort';
import Columns from './Partials/Columns';

const { Search } = Input;

export default function ActivityLog({ activities }) {
    const { columns } = Columns();

    const [params, setParams] = useState({
        load: 10,
        page: 1,
        causer: '',
        field: '',
        direction: '',
    });

    const reload = useCallback(
        debounce((query) => {
            router.get(
                route('log.index'),
                { ...pickBy(query), page: query.causer ? 1 : query.page },
                {
                    preserveState: true,
                }
            );
        }, 150),
        []
    );

    useEffect(() => {
        reload(params);
    }, [params]);

    return (
        <>
            <Head title='Activity Logs' />
            <div className='mx-4 md:mx-[30px] pt-4 md:pt-[30px] min-h-screen'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='text-xl font-bold'>{__('Activity Logs')}</div>
                </div>
                <div className='flex flex-col items-center justify-between gap-y-2 md:flex-row md:gap-y-0 mb-[10px]'>
                    <div className='w-full gap-4 flex'>
                        <Search
                            allowClear
                            size='large'
                            placeholder={__('Search by entity, actor\'s email')}
                            onSearch={(value) => setParams({ ...params, search: value, page: 1 })}
                            style={{ width: 265 }}
                        />
                    </div>
                    <div className='flex w-full items-start justify-start gap-x-4 md:items-center md:justify-end'>
                        <Sorter params={params} setParams={setParams} />
                    </div>
                </div>
                <Table rowKey="id" pagination={false} dataSource={activities.data} columns={columns} />
                <div className='mt-4  flex justify-center md:justify-end'>
                    <Pagination
                        showSizeChanger={false}
                        current={activities?.meta?.current_page}
                        total={activities?.meta?.total}
                        pageSize={activities?.meta?.per_page ?? 1}
                        onChange={(page) => {
                            setParams({ ...params, page: page });
                        }}
                    />
                </div>
            </div>
        </>
    );
}

ActivityLog.layout = (page) => <AuthenticatedLayout children={page} />;
