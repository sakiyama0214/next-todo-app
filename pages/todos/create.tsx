import PrimaryButton from '@/components/atom/PrimaryButton'
import Header from '@/components/Header';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, {useState} from 'react'

const create = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoBody, setTodoBody] = useState('');
    const [todoStatus, setTodoStatus] = useState('notStarted');

    const handleAddTodo = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (todoTitle !== '') {
            if (todoBody !== '') {
                await addDoc(collection(db, 'todos'), {
                    title: todoTitle,
                    body: todoBody,
                    status: todoStatus,
                });
                setTodoTitle('');
                setTodoBody('');
                setTodoStatus('notStarted')
            } else {
                alert('内容を入力してください')
            }
        } else {
            alert('タイトルを入力してください')
        }
    }
  return (
    <>
        <Header />
        <div className='container mx-auto'>
            <h2 className='text-3xl font-bold'>TODO 作成</h2>
            <input
                type='text'
                placeholder='タイトルを入力'
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                className='w-80 h-10 my-3 border-0 rounded-full pl-4'
            />
            <br />
            <textarea
                placeholder='内容を入力'
                value={todoBody}
                onChange={(e) => setTodoBody(e.target.value)}
                className='w-80 h-40 my-2 border-0 rounded-md pl-4 pt-2'
            />
            <br />
            <select
                value={todoStatus}
                onChange={(e) => setTodoStatus(e.target.value)}
            >
                <option value='notStarted'>未完了</option>
                <option value='inProgress'>作業中</option>
                <option value='done'>完了</option>
            </select>
            <br />
            <PrimaryButton onClick={handleAddTodo}>作成</PrimaryButton>
        </div>
    </>
  )
}

export default create