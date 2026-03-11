// import { useThemeToken } from '@/theme/hooks';
export default function HeaderApp({ icon, title, group, children, rightTop, rightBottom }) {

  return (
    <>
      <div
        className='bg-background flex gap-4 p-3 items-center shadow-sm mb-2 rounded-xl '
      >
        <div
          className='w-12 h-12 rounded flex justify-center items-center bg-[#2563eb]'
        // style={{backgroundColor: colorPrimary}}
        >
          {icon}
        </div>
        <div
          className='flex gap-3 flex-1 items-center'
        >
          <div
            className='flex gap-1 flex-col'
          >
            <span className='text-xs'>
              {group}
            </span>
            <h1 className='font-bold'>
              {title}
            </h1>

          </div>
          <div
            className='flex gap-3 flex-1 flex-col items-end'
          >
            {rightTop}
            {rightBottom}
          </div>
        </div>
      </div>
      {children}
    </>

  );
}
