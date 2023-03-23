import React, {useState, useEffect} from 'react'
import Header from "@/components/Header";
import Head from "next/head";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { async } from '@firebase/util';
import Link from 'next/link';

export type Todo = {
  title: string;
  body: string;
  status: string;
  id: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // setTodosにデータを追加
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    onSnapshot(q, async (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => {
          return {
            title: doc.data().title as string,
            body: doc.data().body as string,
            status: doc.data().status as string,
            id: doc.id
          }
        })
      )
    })
  },[])

  return (
    <>
      <Head>
        <title>TODO LIST</title>
      </Head>
      <Header />
      <div className="text-center">
        <h3 className="text-3xl font-bold mt-6">TODOリスト</h3>
        <div>
          <table className='border-collapse m-auto mt-6 border-spacing-10'>
            <thead>
              <tr>
                <th className='text-xl font-bold pr-20'>タイトル</th>
                <th className='text-xl font-bold pr-20'>内容</th>
                <th className='text-xl font-bold'>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo: Todo) => {
                  const todoInfo = {id: todo.id, title: todo.title, body: todo.body, status: todo.status}
                  return (
                    <tr key={todo.id} className='h-20'>
                      <td className='text-xl pr-20'><Link href=''>{todo.title}</Link></td>
                      <td className='text-xl pr-20'>{todo.body}</td>
                      <td className='text-xl'>
                        {switch (todo.status) {
                          case 'inProgress':
                            return '作業中';
                            break;
                          case 'done':
                            return '完了';
                            break;
                          default:
                            return '未完了';
                            break;
                        }}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <ul>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home;