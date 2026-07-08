import {
  FaSmog,
  FaTint,
  FaTrash,
  FaTree,
  FaVolumeUp,
} from "react-icons/fa";

function IssueCard() {
  const issues = [
    {
      icon: <FaSmog className="text-red-500" />,
      title: "Air Pollution",
      desc: "Smoke, emissions & poor air quality",
    },
    {
      icon: <FaTint className="text-blue-500" />,
      title: "Water Pollution",
      desc: "Contaminated rivers and lakes",
    },
    {
      icon: <FaTrash className="text-yellow-500" />,
      title: "Illegal Dumping",
      desc: "Garbage disposal in public areas",
    },
    {
      icon: <FaTree className="text-green-600" />,
      title: "Tree Cutting",
      desc: "Unauthorized deforestation",
    },
    {
      icon: <FaVolumeUp className="text-purple-500" />,
      title: "Noise Pollution",
      desc: "Loud construction & traffic",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Common Environmental Issues
      </h2>

      <div className="space-y-4">

        {issues.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg hover:bg-gray-100 transition"
          >

            <div className="text-3xl">
              {item.icon}
            </div>

            <div>

              <h3 className="font-bold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default IssueCard;