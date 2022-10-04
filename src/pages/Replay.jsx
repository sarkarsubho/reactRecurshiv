import { useState } from "react";

export const Replay = ({ index = 0, data }) => {
  const [display, setdisplay] = useState(false);

  return (
    <div
      style={{
        marginLeft: `${index * 20}px`,
        borderLeft: "3px solid white",
        padding: "15px",
      }}
    >
      {data?.map((e) => {
        return (
          <div key={e.id}>
            <h4>{e.body}</h4>

            {( 
              <button
                onClick={() => {
                  setdisplay(!display);
                }}
              >
                view replay
              </button>
            )}
            {e?.replies?.length > 0 &&
              display &&
              e?.replies?.map((replay,i) => {
              return (
                  <Replay
                    key={replay.id}
                    index={index + 1}
                    data={e.replies}
                  ></Replay>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
