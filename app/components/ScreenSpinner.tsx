const ScreenSpinner = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-white/30 backdrop-blur-2xl  overflow-hidden fixed inset-0 z-50'>
      <div className='s1'>
        <div className='s b sb1'></div>
        <div className='s b sb2'></div>
        <div className='s b sb3'></div>
        <div className='s b sb4'></div>
      </div>

      <div className='s2'>
        <div className='s b sb5 text-blue-700'></div>
        <div className='s b sb6'></div>
        <div className='s b sb7'></div>
        <div className='s b sb8'></div>
      </div>

      <div className='bigcon'>
        <div className='big b'></div>
      </div>
    </div>
  );
};

export default ScreenSpinner;
