import './QuestionCard.css'

export default function({question, handleNext}) {
    if(question)
        return <div className="question">
            <form onSubmit={(e) => {
                e.preventDefault();
                let value;
                for(let i=0; i<4; i++){
                    if(e.target.elements[i].checked === true) value = e.target.elements[i].value;
                }
                console.log(value===question["answer"]);
                handleNext(value===question["answer"]);
            }}>
                <p>Question: {question.question}</p>
                <label><input type="radio" name="option" value="A"/>{question["A"]}</label>
                <label><input type="radio" name="option" value="B"/>{question["B"]}</label>
                <label><input type="radio" name="option" value="C"/>{question["C"]}</label>
                <label><input type="radio" name="option" value="D"/>{question["D"]}</label>
                <button type='submit'>Next</button>
            </form>
        </div>
    return <></>
}