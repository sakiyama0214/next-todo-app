import DeleteButton from '@/components/atom/DeleteButton';
import PrimaryButton from '@/components/atom/PrimaryButton';
import Header from '@/components/Header';
import { db } from '@/lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { status } from '../index';

export default function TodoDetail() {
    const router = useRouter();

    // データを削除
    const onClickDelete = async(id: string) => {
        const result = confirm('本当に削除しますか？');
        if (result) {
            const docRef = doc(db, 'todos', id);
        await deleteDoc(docRef);
        router.push('/');
        }
    }

    return (
        <>
            <Header />
            <div className='w-1/2 mx-auto'>
                <p className='text-2xl mt-10'>
                    <label className='mr-10'>タイトル :</label>
                    <span>{router.query.title}</span>
                </p>
                <br />
                <p className='text-2xl'>
                    <label className='mr-10'>内容 :</label>
                    <span>{router.query.body}</span>
                </p>
                <br />
                <p className='text-2xl'>
                    <label className='mr-10'>ステータス :</label>
                    <span>{status(router.query.status as string)}</span>
                </p>
            
                <br />
                <span className='mr-10'><PrimaryButton>編集する</PrimaryButton></span>
                <DeleteButton onClick={() => onClickDelete(router.query.id as string)}>削除する</DeleteButton>
            </div>
        </>
    )
}