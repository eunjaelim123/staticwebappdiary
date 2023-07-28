import { useState,useContext,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {DiaryStateContext} from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams(); // useParmas ==> 전달받은 id 가져오기

    const [originData,setOriginData] = useState();
    const diaryList = useContext(DiaryStateContext)

    useEffect(()=>{
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    }, []);

    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
            
        if (targetDiary){
          setOriginData(targetDiary);  
        } else {
            navigate("/",{replace:true}); // navigate ==> 홈으로 보내기
        }
        }
    },[id,diaryList])  // useEffect 컴포넌트가 마운트 되었을 때

    return(
        <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>
    );
} ;

export default Edit;
