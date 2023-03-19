import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Sidebar from '@/component/sidebar';
import Center from '@/component/Center';
import { getSession } from 'next-auth/react';
import Player from '../component/Player';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center/>
        </main>
        <div className='sticky bottom-0'>
          <Player />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return { 
    props:{
      session
    }
  }
}