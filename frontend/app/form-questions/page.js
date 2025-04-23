"use client";

export default function Form() {
  const handleSubmit = () => {
    alert(" Survey submitted.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f1ea]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-6 bg-white rounded-lg space-y-6 text-black"
      >
        <h2 className="text-2xl font-semibold text-center ">Survey-form</h2>
        <h3 className="font-semibold text-center">
          Answer from 1-5 (1 being lowest and 5 being heighest)
        </h3>

        <div>
          <p className="font-medium mb-2">
            1. How often do you feel happy and content?
          </p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label className="flex flex-col items-center">
                <input
                  type="radio"
                  name="q1"
                  value={num}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">
            2. How would you rate your sleep quality?
          </p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label className="flex flex-col items-center">
                <input
                  type="radio"
                  name="q2"
                  value={num}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">
            3. How well do you feel your workload is managed?
          </p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label className="flex flex-col items-center">
                <input
                  type="radio"
                  name="q3"
                  value={num}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">
            4. How comfortable are you taking time off for mental or physical
            health?
          </p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label className="flex flex-col items-center">
                <input
                  type="radio"
                  name="q4"
                  value={num}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium mb-2">
            5. How energized do you feel at the start of your workday?
          </p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label className="flex flex-col items-center">
                <input
                  type="radio"
                  name="q5"
                  value={num}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium mb-2">
            6. How often do you take breaks that help you recharge during the
            day?
          </p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label className="flex flex-col items-center">
                <input
                  type="radio"
                  name="q6"
                  value={num}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium mb-2">
            7.How well does your workplace promote a healthy lifestyle?
          </p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label className="flex flex-col items-center">
                <input
                  type="radio"
                  name="q7"
                  value={num}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{num}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
