namespace CodeGenerate.Helpers {
    public static class CefHelper {
        public static string FirstCharToLowerCase (this string str) {
            if (string.IsNullOrEmpty (str) || char.IsLower (str[0]))
                return str;

            return char.ToLower (str[0]) + str.Substring (1);
        }
    }
}