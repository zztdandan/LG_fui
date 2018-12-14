import linqjs from "linqjs";
export function list_to_tree(list, list_id_name, list_label_name, list_parent_name) {
  // 建造新节点的函数

  // 先取出母节点
  let tree_res = new Array();
  let loot_node = list.where(x => x[list_parent_name] == null || x[list_parent_name] === "");
  loot_node.forEach(ele => {
    let new_node = build_new_node(ele, list, list_id_name, list_label_name, list_parent_name, null);
    tree_res.push(new_node);
  });
  return tree_res;
}
function build_new_node(item, list, list_id_para, list_label_para, list_parent_para, item_parent_name) {
  const new_node = new Object(item);
  new_node.id = item[list_id_para];
  new_node.label = item[list_label_para];
  if (item_parent_name) {
    new_node.parent_name = item_parent_name;
  } else {
    new_node.parent_name = "无";
  }
  const NewNodeChirldrenList = list.where(x => x[list_parent_para] === new_node.id);
  if (NewNodeChirldrenList.length > 0) {
    new_node.children = new Array();
    // 有子节点
    NewNodeChirldrenList.forEach(ele => {
      const new_chr_node = build_new_node(ele, list, list_id_para, list_label_para, list_parent_para,new_node.label);
      new_node.children.push(new_chr_node);
    });
    return new_node;
  } else {
    return new_node;
  }
}
