import React,{useState, useEffect} from 'react';

import axios from 'axios';

import {
   IoMdSunny,
   IoMdRainy, 
   IoMdCloudy, 
   IoMdSnow, 
   IoMdThunderstorm, 
   IoMdSearch} from 'react-icons/io'

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';   

import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';

//78ec2c136cc8f911092cf20083d32f46

const APIkey = '78ec2c136cc8f911092cf20083d32f46';
 

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('California');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false) 
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleInput =(e) =>{
    setInputValue(e.target.value)
  };

  const handleSubmit =(e) =>{
    console.log(inputValue);

    if(inputValue !== ' '){
      setLocation(inputValue)
    }
  const input = document.querySelector('input')


  if(input.value ===''){
    setAnimate(true)

    setTimeout(() =>{
      setAnimate(false)
    }, 500)
  }

  input.value=''

    e.preventDefault()

  }

  useEffect(() =>{

    setLoading(true)
    const  url= `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) =>{
      setTimeout(() =>{
        setData(res.data);
        setLoading(false)

      },1500)
      
      
    }).catch(err =>{
      setLoading(false)
      setErrorMsg(err)
    })
  }, [location])

  useEffect(() =>{
    const timer = setTimeout(() =>{
      setErrorMsg('')
    }, 2000)

    return () =>clearTimeout(timer)

  }, [errorMsg])


  console.log(data);

  if(!data){
    return(
      <div className='w-full h-screen bg-gradientBg Bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center '>
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-white'/>
        </div>
      </div>
    )
  }

  let icon;
  console.log(data.weather[0].main); 

  switch(data.weather[0].main){
    case 'Clouds':
      icon = <IoMdCloudy/>;
    break;
    case 'Haze':
      icon = <BsCloudHaze2Fill/>;
    break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]'/>;
    break;
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]'/>;
    break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]'/>;
    break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#dcdcdc]'/>;
    break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm/>;
    break;
  }

  const date=  new Date()
  
  return(
       <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0 '>
          {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[430px] bg-[#ff208c] text-white absolute top-2 lg:top p-4 capitalize rounded-md '>{`${errorMsg.response.data.message}`}</div>}
          <form className={`${animate ? 'animate-shake' : 'animate-none'}h-16 bg-black/30 w-full max-w-[430px] rounded-full backdrop-blur-[32px] mb-4`}>
            <div className='h-full relative flex items-center justify-between p-2'>
              <input className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[19px] font-light pl-6 h-full' onChange={(e) => handleInput(e)} type="text" placeholder='Search city' id="" />
              <button onClick={(e) =>handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex items-center justify-center transition'>
                <IoMdSearch className='text-2xl text-white'/>
              </button>
            </div>

          </form>

          {/*card*/}

          <div className='w-full max-w-[430px] bg-black/20 min-h-[465px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
            {loading ? (

            <div className='w-full h-full flex justify-center items-center'>
                <ImSpinner8 className='text-white text-5xl animate-spin'/>
              </div>):
                    (  <div>
                          <div className=' flex items-center gap-x-5'>
                            <div className='text-[87px]'>{icon}</div>
                            <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
                            <div >{date.getUTCDate()}/{date.getUTCMonth() +1} {date.getUTCFullYear()}</div>
                          </div>
                          <div  className='my-20'>
                            <div className='flex justify-center '>
                              <div className='text-[120px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                              <div className='text-4xl'>
                                <TbTemperatureCelsius/>
                              </div>
                            </div>
                            <div className='capitalize text-center'>{data.weather[0].description}</div>
                          </div>
                          <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                            <div className='flex justify-between'>
                              <div className='flex items-center gap-x-2'>
                                {/*BsEye */}
                                <div className='text-[20px]'>
                                  <BsEye/>
                                </div>
                                <div>
                                  Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
                                </div>
                              </div>
                              <div className='flex items-center gap-x-2'>
                                {/*BsEye */}
                                <div className='text-[20px]'>
                                  <BsThermometer/>
                                </div>
                                <div className='flex'>
                                  Feels like <div className='flex ml-2'>
                                    {parseInt(data.main.feels_like)}
                                    <TbTemperatureCelsius/>
                                    </div>
            
                                </div>
                              </div>
                            </div>
                            <div className='flex justify-between'>
                              <div className='flex items-center gap-x-2'>
                                {/*BsEye */}
                                <div className='text-[20px]'>
                                <BsWater/>
                                </div>
                                <div>
                                Humidity <span className='ml-2'>{data.main.humidity}%</span>
                                </div>
                              </div>
                              <div className='flex items-center gap-x-2'>
                                {/*BsEye */}
                                <div className='text-[20px]'>
                                <BsWind/>
                                </div>
                                <div className='flex'>
                                  Wind <span className='ml-2'>{data.wind.speed}m/s</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>)
            }

          </div>

        </div>
  )

};

export default App;
