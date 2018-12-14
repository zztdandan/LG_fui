export function SimpleAlert(msg, that_vue) {
  that_vue.$alert(msg, "信息", {
    confirmButtonText: "确定",
    callback: action => {}
  });
}

export function SimpleMessage(msg, that_vue) {
  that_vue.$message(msg);
}
