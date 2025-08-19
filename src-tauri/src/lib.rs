// 导入必要的库
use rand::Rng;
use rodio::source::Source;
use rodio::{Device, Devices, InputDevice, StreamConfig};
use std::sync::Mutex;
use std::time::Duration;

// 存储分贝检测状态的结构体
struct DecibelMonitor {
    is_active: bool,
    current_level: f32,
}

// 实现DecibelMonitor的方法
impl DecibelMonitor {
    fn new() -> Self {
        Self {
            is_active: false,
            current_level: 0.0,
        }
    }

    // 开始监测分贝
    fn start(&mut self) {
        if self.is_active {
            return;
        }

        self.is_active = true;

        // 在实际应用中，这里应该启动音频捕获和分贝计算
        // 为了简化示例，我们使用随机值模拟
        std::thread::spawn(move || {
            let mut rng = rand::thread_rng();
            while let Some(monitor) = MONITOR.lock().ok() {
                if !monitor.is_active {
                    break;
                }

                // 生成40-80dB之间的随机值作为模拟数据
                let decibel = rng.gen_range(40.0..80.0);

                // 更新当前分贝值
                if let Ok(mut monitor) = MONITOR.lock() {
                    monitor.current_level = decibel;
                }

                // 每500ms更新一次
                std::thread::sleep(Duration::from_millis(500));
            }
        });
    }

    // 停止监测分贝
    fn stop(&mut self) {
        self.is_active = false;
    }

    // 获取当前分贝值
    fn get_level(&self) -> f32 {
        self.current_level
    }
}

// 全局静态变量，用于存储分贝监测器
lazy_static::lazy_static! {
    static ref MONITOR: Mutex<DecibelMonitor> = Mutex::new(DecibelMonitor::new());
}

// 请求麦克风权限的Tauri命令
#[tauri::command]
fn request_microphone_permission() -> Result<(), String> {
    // 在实际应用中，这里应该请求麦克风权限
    // 为了简化示例，我们直接返回成功
    Ok(())
}

// 获取分贝值的Tauri命令
#[tauri::command]
fn get_decibel_level() -> Result<f32, String> {
    // 尝试锁定并获取监测器
    if let Ok(monitor) = MONITOR.lock() {
        // 返回当前分贝值
        Ok(monitor.get_level())
    } else {
        Err("无法获取分贝监测器".to_string())
    }
}

// 开始监测分贝的Tauri命令
#[tauri::command]
fn start_decibel_monitoring() -> Result<(), String> {
    if let Ok(mut monitor) = MONITOR.lock() {
        monitor.start();
        Ok(())
    } else {
        Err("无法启动分贝监测".to_string())
    }
}

// 停止监测分贝的Tauri命令
#[tauri::command]
fn stop_decibel_monitoring() -> Result<(), String> {
    if let Ok(mut monitor) = MONITOR.lock() {
        monitor.stop();
        Ok(())
    } else {
        Err("无法停止分贝监测".to_string())
    }
}

// 主入口函数
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            request_microphone_permission,
            get_decibel_level,
            start_decibel_monitoring,
            stop_decibel_monitoring
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// 添加lazy_static依赖
#[macro_use]
extern crate lazy_static;
