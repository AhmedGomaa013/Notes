# Notes
The application allows users to make account for writing, saving, editing and deleting any of their notes using Asp.net MVC Core(C# and Entity Framework) and Angular FrameWork.

# Installation and Usage

1. Clone this Repo.
$git clone https://github.com/AhmedGomaa013/Notes.git
2. Open the solution using Vs.
3. Update the environment variables("ASPNETCORE_CONNECTIONSTRINGS:DeFaultString" for Connection String for the database and "Token" for the secret key for Jwt) from Properities of the Solution.
4. Update database using one of the following:
    * .NET Core CLI: dotnet ef database update.
    * Vs PowerShell: Update-Database
5. Build and Run the Project.
