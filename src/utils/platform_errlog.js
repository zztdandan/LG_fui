export function errlog(log_info) {
  console.log("========================================");
  console.log("| lg_admin错误信息:");
  console.log("| ",log_info);
  console.log("----------------------------------------");
}

export function err_entity_log(info, data) {
  console.log("========================================");
  console.log("| lg_admin统一错误处理:");
  console.log("| ",info);
  console.log("| ",data);
  console.log("----------------------------------------");
}

export function log_entity(info, data) {
  console.log("========================================");
  console.log("| lg_admin_log:");

  console.log("| ",info);
  console.log("| ",data);
  console.log("----------------------------------------");
}
