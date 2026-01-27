

type ButtonPropsType = {
 title:string 
 onClick?:()=> void
 disabled?:boolean
 className?:string
}


 export const Button =(props:ButtonPropsType)=>{
  return (
       <button className={props.className}
            disabled={props.disabled}
            onClick={props.onClick}>{props.title}</button>
  )
};