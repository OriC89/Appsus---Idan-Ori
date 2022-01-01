export function Colors({noteId, onChangeColor}) {
    return(
        <section className={`colors colors-${noteId}`}>
            <button onClick={()=>{onChangeColor('#ADD8E6')}} style={{backgroundColor: '#ADD8E6'}}></button>
            <button onClick={()=>{onChangeColor('#d8bfd8')}} style={{backgroundColor: '#d8bfd8'}}></button>
            <button onClick={()=>{onChangeColor('#FFE4E1')}} style={{backgroundColor: '#FFE4E1'}}></button>
            <button onClick={()=>{onChangeColor('#FFF8DC')}} style={{backgroundColor: '#FFF8DC'}}></button>
            <button onClick={()=>{onChangeColor('#FDF5E6')}} style={{backgroundColor: '#FDF5E6'}}></button>
            <button onClick={()=>{onChangeColor('#F0F8FF')}} style={{backgroundColor: '#F0F8FF'}}></button>
            <button onClick={()=>{onChangeColor('#F5F5F5')}} style={{backgroundColor: '#F5F5F5'}}></button>
        </section>
        )
}