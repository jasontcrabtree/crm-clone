public static class EnumExtensions
{
    public static string GetLabel(this Enum enumValue)
    {
        var type = enumValue.GetType();
        var memberInfo = type.GetMember(enumValue.ToString());
        if (memberInfo.Length > 0)
        {
            var attributes = memberInfo[0].GetCustomAttributes(typeof(EnumLabelAttribute), false);
            if (attributes.Length > 0)
            {
                return ((EnumLabelAttribute)attributes[0]).Label;
            }
        }
        return enumValue.ToString();
    }
}