import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import Link from 'next/link';
import {useRouter} from 'next/router';
import SidebarItems from '../components/SidebarItems';

function getHref(path) {
  return SidebarItems().find(x => x.url === path).href;
}

function MyApp({Component, pageProps}) {
  const router = useRouter();
  return (
    <div className='h-full w-full bg-[#FAFBFF]'>
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </div>
  )
}

export default MyApp
