
export default function Topics() {
    const arrOfTopics = ["python", "data science", "react js", "java", "C#(programming language)", "web development", "javascript", "unreal engine", "machine learning", "unity"];
    return (
        <div className="row gap-3 justify-content-between p-3">
            {
                arrOfTopics.map((topic) =>
                    <div key={topic} style={{ height: "60px" }} className="col-12 col-md-3 col-lg-2 text-center fw-bold p-2 bg-white text-capitalize border d-flex align-items-center justify-content-center">{topic}</div>
                )
            }
        </div>
    )
}
