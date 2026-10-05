package uno.mortis.lacus.common.utils

import cn.dev33.satoken.stp.StpUtil

class AuthUtils {
    companion object {
        fun getLoginId(): Long {
            return StpUtil.getLoginId() as Long
        }
    }
}