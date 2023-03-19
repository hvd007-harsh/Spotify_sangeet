import { getProviders, signIn } from 'next-auth/react';

const Login = ({ providers }) => {
  console.log(providers);
  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-black'>
       <h1 className=' text-white '>Login with spotify</h1>
       <img src="https://links.papareact.com/9xl" className='h-20' alt="" />
       {Object.values(providers).map((provider) => (<div key={provider.id} className="text-white">
          <button className="bg-[#18D860] text-white p-5 rounded-md"
           onClick={()=> signIn(provider.id ,{ callbackUrl:"/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  console.log(providers);
  return {
    props: {
      providers
    },
  };
}
