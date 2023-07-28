import { useContext, useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {

    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext)  // useContext 로 다이어리 내용 가져오기
    const navigate = useNavigate();
    const [data,setData] = useState();

    useEffect(()=>{
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
    }, []);

    useEffect(()=>{
        if (diaryList.length >= 1){
            const targetDiary = diaryList.find(
                (it)=>parseInt(it.id) === parseInt(id)
        ); 
        

            if(targetDiary){
                // 일기가 존재할때
                setData(targetDiary);
            }else{
                // 일기가 없을 때
                alert("없는 일기입니다.")
                navigate('/',{replace:true});
            }
        }
    },[id,diaryList]);

    if(!data){
        return <div className="DiaryPage">로딩중입니다...</div>
    }else{
        const curEmotionDate = emotionList.find((it)=>parseInt(it.emotion_id)===parseInt(data.emotion))

        console.log(curEmotionDate);
        return(
            <div className="DiaryPage">
                
                <MyHeader headText={`${getStringDate(new Date(data.date))} 기록`} 
                    leftchild={<MyButton text={'<뒤로가기'} 
                    onClick = {()=>navigate(-1)} />
                    }
                    rightchild = {
                    <MyButton text={"수정하기"} 
                     onClick={()=> navigate(`/edit/${data.id}`)} />
                    }   
                                
    />
                <article>
                    <section>
                      <h4>오늘의 감정</h4> 
                      <div className={["diary_img_wrapper",`diary_img_wrapper_${data.emotion}`].join(" ")}>
                       <img src ={curEmotionDate.emotion_img} />  
                      
                      <div className="emotion_descript">
                        {curEmotionDate.emotion_descript}
                      </div>
                      </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wraper">
                         <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }

    
}

export default Diary;
