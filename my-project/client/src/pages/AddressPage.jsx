

export default function AddressPage({children,className=null}){

    if(!className){
        className = 'my-3 block'
    }
    className += 'flex gap-1 font-semibold underline'
    return(
        <div>
            <a className={className}
            target='_blank' href={'http://map.google.com/?g='+children}>{children}</a>
        </div>

    )
}