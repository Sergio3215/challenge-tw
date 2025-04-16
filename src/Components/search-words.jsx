
export default function SearchWords({handlerChangeInput}){

    return(
        <input type="search" onChange={handlerChangeInput} placeholder="Busca una palabra del chat"/>
    )
}