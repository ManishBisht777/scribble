// "use client";

// import { useMemo } from "react";
// import { createAvatar } from "@dicebear/core";
// import * as adventurer from "@dicebear/adventurer";

// import { schema } from "@dicebear/core";

// const options = {
//   ...schema.properties,
//   ...adventurer.schema.properties,
// };

// function useAvatar() {
//   const avatar = useMemo(() => {
//     return createAvatar(adventurer, {
//       size: 128,
//       seed: Math.random().toString(),
//       radius: 50,
//       backgroundColor: ["#f0f0f0", "#e0e0e0", "#d0d0d0"],
//       ...options,
//     }).toDataUriSync();
//   }, []);

//   return { avatar };
// }

// export default useAvatar;

// // https://api.dicebear.com/7.x/adventurer/svg?seed=random?size=32?radius=50?backgroundColor=b6e3f4
