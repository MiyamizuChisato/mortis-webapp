package uno.mortis.lacus.core.user.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Mapper
import uno.mortis.lacus.core.user.entity.UserSocial

@Mapper
interface UserSocialMapper: BaseMapper<UserSocial> {
}