import Layout from "../components/Layout";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import CardItem from "../components/CardItem";
import BoardData from "../data/board-data.json";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { verifier } from "../utils/jwt";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };

  return (
    <Layout>
      <div className="p-10 flex flex-col h-screen">
        {/* Board header */}
        <div className="flex flex-initial justify-between">
          <div className="flex items-center">
            <h4 className="text-4xl text-gray-800 ml-64">Projects</h4>
          </div>

          <div></div>
        </div>

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-5 mt-5 mx-64">
              {boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                          >
                            <h4 className=" p-3 flex justify-between items-center">
                              <span className="text-2xl text-gray-600">
                                {board.name}
                              </span>
                              <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
                            </h4>

                            {showForm && selectedBoard === bIndex ? (
                              <div className="p-3">
                                <textarea
                                  className="border-gray-300 rounded focus:ring-purple-400 w-full"
                                  rows={3}
                                  placeholder="Task info"
                                  data-id={bIndex}
                                  onKeyDown={(e) => onTextAreaKeyPress(e)}
                                />
                              </div>
                            ) : (
                              <button
                                className="flex justify-center bg-gray-200 mx-3 rounded-lg py-2 items-center my-3 space-x-2 text-lg"
                                onClick={() => {
                                  setSelectedBoard(bIndex);
                                  setShowForm(true);
                                }}
                              >
                                <AiOutlinePlus className="w-5 h-5 text-green-500" />
                              </button>
                            )}

                            <div
                              className="overflow-y-auto overflow-x-hidden h-auto mb-3"
                              style={{ maxHeight: "calc(100vh - 290px)" }}
                            >
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      className="m-3"
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </div>
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  console.log("COKI", context.req.headers.cookie);
  let token = cookies.split(";").find((c) => c.trim().startsWith("taskez="));
  if (token) {
    token = token.split("=")[1];
    console.log(token);
    const user = await verifier(token);
    console.log(user);
    if (user) {
      return {
        props: {
          user,
        },
      };
    } else {
      //redirect to login page;
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
  }
  //redirect to login page;
  return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };
}
