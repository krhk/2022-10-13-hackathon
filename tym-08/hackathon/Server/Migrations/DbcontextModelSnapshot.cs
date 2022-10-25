﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using hackathon.Server.Db;

#nullable disable

namespace hackathon.Server.Migrations
{
    [DbContext(typeof(Dbcontext))]
    partial class DbcontextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("hackathon.Shared.Models.dbUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("hackathon.Shared.Models.Trip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("ComeBack")
                        .HasColumnType("datetime2");

                    b.Property<string>("EndPosX")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EndPosY")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartPosX")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartPosY")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ToTrip")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("WhenDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("dbUserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("dbUserId");

                    b.ToTable("Trip");
                });

            modelBuilder.Entity("hackathon.Shared.Models.Trip", b =>
                {
                    b.HasOne("hackathon.Shared.Models.dbUser", null)
                        .WithMany("Trips")
                        .HasForeignKey("dbUserId");
                });

            modelBuilder.Entity("hackathon.Shared.Models.dbUser", b =>
                {
                    b.Navigation("Trips");
                });
#pragma warning restore 612, 618
        }
    }
}
