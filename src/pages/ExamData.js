import examData from "../data/exam-data.json";

function ExamData() {
  const getTotalWeight = (products) => {
    let totalWeight = 0;

    products.forEach((product) => {
      if (!product.is_editable_price) {
        totalWeight += product.weight;
      }
    });
    return totalWeight;
  };

  return (
    <div className="container">
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {examData.map((v, i) => {
            if (v.is_editable_price === false) {
              return (
                <tr key={i}>
                  <td>{v.name}</td>
                  <td>{getTotalWeight(v.products)}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExamData;
