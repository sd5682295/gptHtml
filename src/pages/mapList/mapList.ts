// const data: { nodes: Node[]; edges: Edge[] } = {
//   nodes: [
//     { id: 1, label: '唐僧' },
//     { id: 2, label: '孙悟空' },
//     { id: 3, label: '猪八戒' },
//   ],
//   edges: [
//     { from: 1, to: 2 },
//     { from: 1, to: 3 },
//     { from: 2, to: 1 },
//     { from: 2, to: 3 },
//     { from: 3, to: 1 },
//     { from: 3, to: 2 },
//   ],
// };

// 输出结果// [//   {//     label: '唐僧',//     children: [//       {//         label: '孙悟空',//         children: [{ label: '猪八戒' }],//       },//       { label: '猪八戒', children: [{ label: '孙悟空' }] },//     ],//   },//   {//     label: '孙悟空',//     children: [//       {//         label: '唐僧',//         children: [{ label: '猪八戒' }],//       },//       { label: '猪八戒', children: [{ label: '唐僧' }] },//     ],//   },//   {//     label: '猪八戒',//     children: [//       {//         label: '唐僧',//         children: [{ label: '孙悟空' }],//       },//       { label: '孙悟空', children: [{ label: '唐僧' }] },//     ],//   },// ]
