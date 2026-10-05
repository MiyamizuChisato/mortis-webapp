package uno.mortis.lacus.core.user.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Select
import uno.mortis.lacus.core.user.entity.UserRole

@org.apache.ibatis.annotations.Mapper
interface UserRoleMapper : BaseMapper<UserRole> {
    @Select(
        """
            SELECT role_name from system_role 
            left join user_role on system_role.id = user_role.role_id 
            where user_id = #{userId}
        """
    )
    fun selectRoleByUserId(userId: Long): List<String>
}